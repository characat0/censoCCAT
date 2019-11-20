const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Miembro extends Model {}

Miembro.init({
    fechaAfiliacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    documentoIdentidad: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    codigoUniversitario: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    numeroCelular: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    sexo: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
    },
    areaPertenencia: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
},{
    sequelize,
    modelName: 'miembro',
    timestamps: false,
    comment: 'La tabla miembro contiene el parque de datos de un miembro.'
});
Miembro.sync();

module.exports = Miembro;