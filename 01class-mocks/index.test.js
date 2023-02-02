const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/withHeaderError-invalid.csv";
    const rejection = new Error(error.FILE_FIELD_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 122,
        name: "Name A",
        profession: "Profession A",
        birthYear: 1968,
      },
      {
        id: 123,
        name: "Name B",
        profession: "Profession B",
        birthYear: 1989,
      },
      {
        id: 124,
        name: "Name C",
        profession: "Profession C",
        birthYear: 1992,
      },
    ];
    deepStrictEqual(JSON.stringify(result),JSON.stringify(expected))
  }
})();
