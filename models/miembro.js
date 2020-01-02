const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Miembro extends Model {}

Miembro.init({
    fechaAfiliacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    cicloEgreso: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    trabajaActualmente: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
        type: DataTypes.STRING,
        allowNull: false
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
    cicloIngreso: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    numeroCelular: {
        type: DataTypes.STRING,
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
    foto: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
    },
    areasPertenencia: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
    lugarNacimiento: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    nacionalidadAdicional: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    lugarResidencia: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
},{
    sequelize,
    tableName: 'miembro',
    timestamps: false,
    underscored: true,
    comment: 'La tabla miembro contiene el parque de datos de un miembro.'
});
Miembro.sync();

module.exports = Miembro;