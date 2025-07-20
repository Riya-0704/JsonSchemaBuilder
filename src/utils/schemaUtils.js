/**
 * Generate a unique ID for schema fields
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Create a default field with specified type
 * @param {'String' | 'Number' | 'Nested'} type - The field type
 * @returns {import('../types/schema.js').SchemaField} Default field object
 */
export const createDefaultField = (type = 'String') => {
  const id = generateId();
  const field = {
    id,
    key: `field_${id}`,
    type,
  };

  if (type === 'String') {
    field.value = '';
  } else if (type === 'Number') {
    field.value = 0;
  } else if (type === 'Nested') {
    field.children = [];
  }

  return field;
};

/**
 * Convert schema fields to JSON object
 * @param {import('../types/schema.js').SchemaField[]} fields - Array of schema fields
 * @returns {Record<string, any>} JSON representation
 */
export const convertToJSON = (fields) => {
  const result = {};
  
  fields.forEach(field => {
    if (field.type === 'Nested' && field.children) {
      result[field.key] = convertToJSON(field.children);
    } else {
      result[field.key] = field.value;
    }
  });
  
  return result;
};

/**
 * Find a field by ID in the schema tree
 * @param {import('../types/schema.js').SchemaField[]} fields - Array of schema fields
 * @param {string} id - Field ID to find
 * @returns {import('../types/schema.js').SchemaField | null} Found field or null
 */
export const findFieldById = (fields, id) => {
  for (const field of fields) {
    if (field.id === id) {
      return field;
    }
    if (field.children) {
      const found = findFieldById(field.children, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Remove a field by ID from the schema tree
 * @param {import('../types/schema.js').SchemaField[]} fields - Array of schema fields
 * @param {string} id - Field ID to remove
 * @returns {import('../types/schema.js').SchemaField[]} Updated fields array
 */
export const removeFieldById = (fields, id) => {
  return fields.filter(field => {
    if (field.id === id) {
      return false;
    }
    if (field.children) {
      field.children = removeFieldById(field.children, id);
    }
    return true;
  });
};