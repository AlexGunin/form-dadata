class Helper {
  throttle(func, delay) {
    let ready = true;
    return function wrap(...args) {
      if (ready) {
        setTimeout(() => {
          ready = true;
          func(...args);
        }, delay);
        func(...args);
        ready = false;
      }
    };
  }

  readDelimObjectProperties(name, info) {
    const properties = name.split('/');
    const result = properties.map((prop) => {
      if (prop.includes('.')) return this.readStrObjectProperty(prop, info);
      return info[prop];
    });
    return result.join(' / ');
  }

  readStrObjectProperty(name, info) {
    let temp = JSON.parse(JSON.stringify(info));
    name.split('.').forEach((level) => {
      temp = temp[level];
    });
    return temp;
  }
}

export default new Helper();
