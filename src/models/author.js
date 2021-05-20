module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 25],
          msg: "author must be between 3 and 25 characters",
        },
        notNull: { args: true, msg: "An author must be entered" },
      },
    },
  };

  const AuthorModel = connection.define("Author", schema);
  return AuthorModel;
};
