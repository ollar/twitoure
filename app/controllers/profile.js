import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { all, hash, resolve } from 'rsvp';

import imageResize from '../utils/image-resize';

const IMAGE_SIZES = [128, 256, 512];

export default Controller.extend({
    i18n: service(),
    fileStorage: service(),

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
                // .then(() =>
                //     hash(
                //         IMAGE_SIZES.reduce((acc, cur) => {
                //             acc[cur] = imageResize(file, {
                //                 maxWidth: cur,
                //                 maxHeight: cur,
                //             });
                //             return acc;
                //         }, {})
                //     )
                // )
                // .then(images =>
                //     all(
                //         images.map(image =>
                //             this.fileStorage.upload(
                //                 `users/${this.model.id}/${image.width}/${
                //                     image.name
                //                 }`,
                //                 image
                //             )
                //         )
                //     )
                // )
                // .then(images =>
                //     Object.keys(images).map(key => {
                //         console.log(key, images[key]);
                //     })
                // )
                .then(snapshots => {
                    // all(
                    //     snapshots.map(shot => {
                    //         const a = this.store.createRecord('user/avatar');
                    //         const m = this.store.createRecord('image', {
                    //             url: shot.downloadURLs[0],
                    //             fullPath: shot.fullPath,
                    //             type: shot.contentType,
                    //             name: shot.name,
                    //             size: shot.size,
                    //             created: new Date(
                    //                 snapshots[0].timeCreated
                    //             ).valueOf(),
                    //         });

                    //         this.model.avatar.pushObject(m);
                    //         return m.save();
                    //     })
                    // );
                    const a = this.store.createRecord('user/avatar');
                    const m = this.store.createRecord('image', {
                        url: '',
                        fullPath: '',
                        type: '',
                        name: '',
                        size: '',
                        created: Date.now(),
                    });

                    a.setProperties({
                        '128': m,
                        '256': m,
                        '512': m,
                    });

                    m.save();
                    a.save();
                    this.model.set('avatar', a);
                    return true;
                })
                .then(() => this.model.save());
            // .catch(err =>
            //     this.send('notify', {
            //         type: 'error',
            //         text: err.message,
            //     })
            // );
        },
    },
});
