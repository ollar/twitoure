import DS from 'ember-data';
import { inject as service } from '@ember/service';
import v4 from 'npm:uuid/v4';

export default DS.Adapter.extend({
    amplify: service(),

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
        const modelPath = this._modelName(type);

        return this.get('amplify.sdk.API').get('pointsCRUD', modelPath);
    },
    findMany(store, type, ids, snapshots) {

    },
    query(store, type, query) {},
});
