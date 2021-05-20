module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 25],
          msg: "Genre must be between 3 and 25 characters",
        },
        notNull: { args: true, msg: "A genre must be entered" },
      },
    },
  };

  const GenreModel = connection.define("Genre", schema);
  return GenreModel;
};
