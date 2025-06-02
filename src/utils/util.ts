const Util = {
  stringFormat: (value: string, ...args: any[]) => {
    return value.replace(/{([0-9]+)}/g, (match, index) => {
      return args[index] === "" ? match : args[index];
    });
  },
};

export default Util;