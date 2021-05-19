module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [3, 25], msg: "Name must be between 3 and 25 characters" },
        notNull: { args: true, msg: "A name must be entered" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: "Must be a valid email" },
        notNull: { args: true, msg: "Please enter an email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: "Password must be between 8 and 20 characters",
        },
        notNull: { args: true, msg: "Please enter a password" },
      },
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
