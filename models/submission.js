const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Miembro = require('./miembro');
class Submission extends Model {}

Submission.init({
    direccionIp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idEntradaMiembro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Miembro,
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'submission',
    updatedAt: false,
    freezeTableName: true,
    comment: 'La tabla submission contiene informacion sobre los envios de formularios'
});
Submission.hasOne(Miembro);
Submission.sync();

module.exports = Submission;