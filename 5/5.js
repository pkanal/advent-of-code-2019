const { add } = require("../2/2.1");

const INSTRUCTIONS = {
  ADD: "ADD",
  MULTIPLY: "MULTIPLY",
  INPUT: "INPUT",
  OUTPUT: "OUTPUT",
  END: "END",
  JUMP_IF_TRUE: "JUMP_IF_TRUE",
  JUMP_IF_FALSE: "JUMP_IF_FALSE",
  LESS_THAN: "LESS_THAN",
  EQUALS: "EQUALS"
};

const PARAMETER_TYPES = {
  0: "POSITION",
  1: "IMMEDIATE"
};

const NUMBER_OF_PARAMETERS = {
  [INSTRUCTIONS.ADD]: 2,
  [INSTRUCTIONS.MULTIPLY]: 2,
  [INSTRUCTIONS.INPUT]: 1,
  [INSTRUCTIONS.OUTPUT]: 1,
  [INSTRUCTIONS.END]: 0,
  [INSTRUCTIONS.JUMP_IF_TRUE]: 2,
  [INSTRUCTIONS.JUMP_IF_FALSE]: 2,
  [INSTRUCTIONS.LESS_THAN]: 2,
  [INSTRUCTIONS.EQUALS]: 2
};

const OPCODEINSTRUCTIONS = {
  1: INSTRUCTIONS.ADD,
  2: INSTRUCTIONS.MULTIPLY,
  3: INSTRUCTIONS.INPUT,
  4: INSTRUCTIONS.OUTPUT,
  5: INSTRUCTIONS.JUMP_IF_TRUE,
  6: INSTRUCTIONS.JUMP_IF_FALSE,
  7: INSTRUCTIONS.LESS_THAN,
  8: INSTRUCTIONS.EQUALS,
  99: INSTRUCTIONS.END
};

const parseOpCode = opCode => {
  const instruction =
    opCode.toString().length <= 2
      ? OPCODEINSTRUCTIONS[opCode]
      : OPCODEINSTRUCTIONS[parseInt(opCode.toString().slice(-2), 10)];

  const completeOpCode = opCode
    .toString()
    .padStart(NUMBER_OF_PARAMETERS[instruction] + 2, "0");
  const opCodeAsArray = completeOpCode
    .toString()
    .split("")
    .map(n => parseInt(n, 10));
  const parameters = opCodeAsArray
    .slice(0, opCodeAsArray.length - 2)
    .reverse()
    .map(p => PARAMETER_TYPES[p]);

  switch (instruction) {
    case INSTRUCTIONS.ADD:
      return {
        action: INSTRUCTIONS.ADD,
        parameters,
        nextInstruction: 4
      };
    case INSTRUCTIONS.MULTIPLY:
      return {
        action: INSTRUCTIONS.MULTIPLY,
        parameters,
        nextInstruction: 4
      };
    case INSTRUCTIONS.INPUT:
      return {
        action: INSTRUCTIONS.INPUT,
        parameters,
        nextInstruction: 2
      };
    case INSTRUCTIONS.OUTPUT:
      return {
        action: INSTRUCTIONS.OUTPUT,
        parameters,
        nextInstruction: 2
      };
    case INSTRUCTIONS.JUMP_IF_TRUE:
      return {
        action: INSTRUCTIONS.JUMP_IF_TRUE,
        parameters,
        nextInstruction: 3
      };
    case INSTRUCTIONS.JUMP_IF_FALSE:
      return {
        action: INSTRUCTIONS.JUMP_IF_FALSE,
        parameters,
        nextInstruction: 3
      };
    case INSTRUCTIONS.LESS_THAN:
      return {
        action: INSTRUCTIONS.LESS_THAN,
        parameters,
        nextInstruction: 4
      };
    case INSTRUCTIONS.EQUALS:
      return {
        action: INSTRUCTIONS.EQUALS,
        parameters,
        nextInstruction: 4
      };
    case INSTRUCTIONS.END:
      return {
        action: INSTRUCTIONS.END,
        parameters: []
      };
  }
};

const interpret = (code, input = null) =>
  code.reduce(
    (acc, value, i) => {
      if (i !== acc.nextInstructionIndex || acc.nextInstructionIndex === -1) {
        return acc;
      }
      const { action, parameters, nextInstruction } = parseOpCode(value);
      switch (action) {
        case INSTRUCTIONS.ADD: {
          const [firstParameterType, secondParameterType] = parameters;
          const firstNumber =
            firstParameterType === "IMMEDIATE"
              ? acc.memory[i + 1]
              : acc.memory[acc.memory[i + 1]];
          const secondNumber =
            secondParameterType === "IMMEDIATE"
              ? acc.memory[i + 2]
              : acc.memory[acc.memory[i + 2]];

          const writePosition = acc.memory[i + 3];
          const result = add(firstNumber, secondNumber);
          acc.memory[writePosition] = result;
          return {
            ...acc,
            memory: acc.memory,
            nextInstructionIndex: i + nextInstruction
          };
        }
        case INSTRUCTIONS.MULTIPLY: {
          const numbers = parameters.map((p, pI) =>
            p === "IMMEDIATE"
              ? acc.memory[i + pI + 1]
              : acc.memory[acc.memory[i + pI + 1]]
          );
          const writePosition = acc.memory[i + 3];
          const result = numbers.reduce((acc, val) => acc * val, 1);
          // console.log(result);

          acc.memory[writePosition] = result;
          return {
            ...acc,
            memory: acc.memory,
            nextInstructionIndex: i + nextInstruction
          };
        }
        case INSTRUCTIONS.INPUT: {
          const writePosition = acc.memory[i + 1];
          acc.memory[writePosition] = input;
          return {
            ...acc,
            memory: acc.memory,
            nextInstructionIndex: i + nextInstruction
          };
        }
        case INSTRUCTIONS.OUTPUT: {
          const [parameterType] = parameters;
          const result =
            parameterType === "IMMEDIATE"
              ? acc.memory[i + 1]
              : acc.memory[acc.memory[i + 1]];
          return {
            ...acc,
            memory: acc.memory,
            output: result,
            nextInstructionIndex: i + nextInstruction
          };
        }
        case INSTRUCTIONS.JUMP_IF_TRUE: {
          const [firstParameterType, secondParameterType] = parameters;
          const firstNumber =
            firstParameterType === "IMMEDIATE"
              ? acc.memory[i + 1]
              : acc.memory[acc.memory[i + 1]];
          const secondNumber =
            secondParameterType === "IMMEDIATE"
              ? acc.memory[i + 2]
              : acc.memory[acc.memory[i + 2]];
          return {
            ...acc,
            nextInstructionIndex:
              firstNumber !== 0 ? secondNumber : i + nextInstruction
          };
        }
        case INSTRUCTIONS.JUMP_IF_FALSE: {
          const [firstParameterType, secondParameterType] = parameters;
          const firstNumber =
            firstParameterType === "IMMEDIATE"
              ? acc.memory[i + 1]
              : acc.memory[acc.memory[i + 1]];
          const secondNumber =
            secondParameterType === "IMMEDIATE"
              ? acc.memory[i + 2]
              : acc.memory[acc.memory[i + 2]];
          return {
            ...acc,
            nextInstructionIndex:
              firstNumber === 0 ? secondNumber : i + nextInstruction
          };
        }
        case INSTRUCTIONS.LESS_THAN: {
          const [firstParameterType, secondParameterType] = parameters;
          const firstNumber =
            firstParameterType === "IMMEDIATE"
              ? acc.memory[i + 1]
              : acc.memory[acc.memory[i + 1]];
          const secondNumber =
            secondParameterType === "IMMEDIATE"
              ? acc.memory[i + 2]
              : acc.memory[acc.memory[i + 2]];
          const writePosition = acc.memory[i + 3];
          acc.memory[writePosition] = firstNumber < secondNumber ? 1 : 0;
          return {
            ...acc,
            memory: acc.memory,
            nextInstructionIndex: nextInstruction + i
          };
        }
        case INSTRUCTIONS.EQUALS: {
          const [firstParameterType, secondParameterType] = parameters;
          const firstNumber =
            firstParameterType === "IMMEDIATE"
              ? acc.memory[i + 1]
              : acc.memory[acc.memory[i + 1]];
          const secondNumber =
            secondParameterType === "IMMEDIATE"
              ? acc.memory[i + 2]
              : acc.memory[acc.memory[i + 2]];
          const writePosition = acc.memory[i + 3];
          acc.memory[writePosition] = firstNumber === secondNumber ? 1 : 0;
          return {
            ...acc,
            memory: acc.memory,
            nextInstructionIndex: nextInstruction + i
          };
        }
        case INSTRUCTIONS.END:
          return { ...acc, nextInstructionIndex: -1 };
      }
    },
    {
      memory: code,
      input,
      output: null,
      nextInstructionIndex: 0
    }
  );

module.exports = {
  parseOpCode,
  interpret
};
