import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        willTransition() {
            const model = this.controllerFor(this.routeName).model;
            if (!model.isSaving && model.hasDirtyAttributes)
                model.rollbackAttributes();
            return true;
        },
    },
});
