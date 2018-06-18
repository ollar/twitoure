import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

import imageResize from '../utils/image-resize';

const IMAGE_SIZES = [128, 512, 800];

export default Controller.extend({
    i18n: service(),
    fileStorage: service(),

    actions: {
        submit() {
            if (this.get('model').validate()) {
                this.model.save().then(() =>
                    this.send('notify', {
                        type: 'success',
                        text: this.get('i18n').t('profile.success_message'),
                    })
                );
            }
        },

        cancel() {
            this.transitionToRoute('index');
        },

        uploadImage(files) {
            const file = files[0];

            all(
                IMAGE_SIZES.map(size =>
                    imageResize(file, { maxWidth: size, maxHeight: size })
                )
            )
                .then(images =>
                    all(
                        images.map(image =>
                            this.fileStorage.upload(
                                `users/${this.model.id}/${image.width}/${
                                    image.name
                                }`,
                                image
                            )
                        )
                    )
                )
                .then(snapshots =>
                    all(
                        snapshots.map(shot => {
                            const m = this.store.createRecord('image', {
                                url: shot.downloadURLs[0],
                                fullPath: shot.fullPath,
                                type: shot.contentType,
                                name: shot.name,
                                size: shot.size,
                                created: new Date(
                                    snapshots[0].timeCreated
                                ).valueOf(),
                            });
                            this.model.avatar.pushObject(m);
                            return m.save();
                        })
                    )
                )
                .then(() => this.model.save())
                .catch(err =>
                    this.send('notify', {
                        type: 'error',
                        text: err.message,
                    })
                );
        },
    },
});
