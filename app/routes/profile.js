import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    actions: {
        willTransition() {
            const model = this.controllerFor(this.routeName).model;
            if (!model.isSaving && model.hasDirtyAttributes)
                model.rollbackAttributes();
            return true;
        },
    },
});
