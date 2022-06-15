const usuarios = (sequelize, DataTypes) => {
  const tabelaUsuarios = sequelize.define("User", {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  tabelaUsuarios.associate = (models) => {
    tabelaUsuarios.belongsTo(models.Permissoes, {
      foreignKey: 'permissaoId', as: 'permissao'
    });
  };

  return tabelaUsuarios;
}

module.exports = usuarios;