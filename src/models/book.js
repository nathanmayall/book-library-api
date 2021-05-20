module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 25],
          msg: "Title must be between 3 and 25 characters",
        },
        notNull: { args: true, msg: "A title must be entered" },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 25],
          msg: "Author must be between 3 and 25 characters",
        },
        notNull: { args: true, msg: "An author must be entered" },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 13],
          msg: "ISBN must be between 10 and 13 characters",
        },
        notNull: { args: true, msg: "An ISBN must be entered" },
      },
    },
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
