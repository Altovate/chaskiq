import React from "react";
import { snakeCase, camelCase } from "lodash";
import Input from "./Input";

export const errorsFor = (name, errors) => {
  if (!errors[name]) return null;
  //console.log("error for", name);
  return errors[name].map((o) => o).join(", ");
};

export function gridClasses(field) {
  return Object.keys(field.grid)
    .map((o) => {
      if(o === "xs") return field.grid[o]
      return `${o}:${field.grid[o]}`;
    })
    .join(" ");
}

class FieldRenderer extends React.Component {
  fieldRenderer = () => {
    const {
      namespace,
      type,
      data,
      props,
      errors,
      errorNamespace,
      handler,
    } = this.props;
    const errorName = snakeCase(
      `${errorNamespace ? errorNamespace : ""}${data.name}`
    );
    const errorMessage = errorsFor(errorName, errors);

    return (
      <div
        error={errorMessage}
        //className={classes.formControl}
      >
        <Input
          data={data}
          label={data.label || data.name}
          error={errorMessage}
          variant="standard"
          type={type}
          placeholder={data.placeholder}
          options={data.options}
          fullWidth
          name={`${namespace}[${data.name}]`}
          defaultValue={props.data[camelCase(data.name)]}
          handler={handler}
          helperText={
            <React.Fragment>
              {errorMessage && (
                <p className={`text-red-500 text-xs italic`}>{errorMessage}</p>
              )}

              {data.hint && (
                <p className={`text-gray-500 text-xs`}>{data.hint}</p>
              )}
            </React.Fragment>
          }
        />
      </div>
    );
  };

  render() {
    return this.fieldRenderer();
  }
}

export default FieldRenderer;
