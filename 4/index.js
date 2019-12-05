const { getPossiblePasswordsInRange, isValidPassword } = require("./4.1");
const { isMoreAccurateValidPassword } = require("./4.2");

const main = () => {
  console.log(
    "4.1:",
    getPossiblePasswordsInRange(246540, 787419, isValidPassword)
  );

  console.log(
    "4.2:",
    getPossiblePasswordsInRange(246540, 787419, isMoreAccurateValidPassword)
  );
};

main();
