import DS from 'ember-data';
import { inject as service } from '@ember/service';
import v4 from 'npm:uuid/v4';

export default DS.RESTAdapter.extend({
    amplify: service(),

    // shouldBackgroundReloadAll
    // shouldBackgroundReloadRecord
    // shouldReloadAll
    // shouldReloadRecord

    _modelName(type) {
        return type.modelName;
    },

    generateIdForRecord(store, inputProperties) {
        return v4();
    },

    findRecord(store, type, id, snapshot) {},
    createRecord(store, type, snapshot) {},
    updateRecord(store, type, snapshot) {},
    deleteRecord(store, type, snapshot) {},
    findAll(store, type, sinceToken) {
        const modelName = this._modelName(type);

        return this.get('amplify.sdk.API').get(
            `${this.pathForType(modelName)}CRUD`,
            this.buildURL(modelName)
        );
    },
    findMany(store, type, ids, snapshots) {},
    query(store, type, query) {},
});
