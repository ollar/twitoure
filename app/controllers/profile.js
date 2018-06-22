import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { hash, resolve } from 'rsvp';

import imageResize from '../utils/image-resize';

const IMAGE_SIZES = [128, 256, 512];

export default Controller.extend({
    i18n: service(),
    fileStorage: service(),

    _processImageUpload(file, size) {
        return imageResize(file, {
            maxWidth: size,
            maxHeight: size,
        })
            .then(image =>
                this.fileStorage.upload(
                    `users/${this.model.id}/${image.width}/${image.name}`,
                    image
                )
            )
            .then(snapshot => {
                const m = this.store.createRecord('image', {
                    url: snapshot.downloadURLs[0],
                    fullPath: snapshot.fullPath,
                    type: snapshot.contentType,
                    name: snapshot.name,
                    size: snapshot.size,
                    created: new Date(snapshot.timeCreated).valueOf(),
                });

                return m.save();
            });
    },

    actions: {
        submit() {
            if (this.get('model').validate()) {
                this.model.save().then(() =>
                    this.send('notify', {
                        type: 'success',
                        text: this.get('i18n').t(
                            'profile.save.success_message'
                        ),
                    })
                );
            }
        },

        cancel() {
            this.transitionToRoute('index');
        },

        uploadImage(files) {
            const file = files[0];

            // all(this.model.avatar.map(a => a.destroyRecord()))
            resolve()
                .catch(() => true)
                .then(() =>
                    hash(
                        IMAGE_SIZES.reduce((acc, cur) => {
                            acc[cur] = this._processImageUpload(file, cur);
                            return acc;
                        }, {})
                    )
                )
                .then(_hash => {
                    const a = this.store.createRecord('user/avatar');
                    a.setProperties(_hash);
                    this.model.set('avatar', a);
                    a.save();
                    return this.model.save();
                })
                .catch(err =>
                    this.send('notify', {
                        type: 'error',
                        text: err.message,
                    })
                );
        },
    },
});
