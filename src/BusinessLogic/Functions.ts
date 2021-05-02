import { IAnswersCount } from "./Interfaces";

/**
 * Function types
 */
type UpdatePropertyType = ( object: IAnswersCount,
    property: string) => IAnswersCount

const updatePropery: UpdatePropertyType = (
    object: IAnswersCount,
    property: string
  ): IAnswersCount => {
    const valueToUpdate = object[property as keyof IAnswersCount];
    const newValue = valueToUpdate + 1;
    const newObject = { ...object, [valueToUpdate]: newValue };
  
    return newObject;
  };


  const Functions = {updatePropery}

  export default Functions;