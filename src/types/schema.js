/**
 * @typedef {Object} SchemaField
 * @property {string} id - Unique identifier for the field
 * @property {string} key - The field name/key
 * @property {'String' | 'Number' | 'Nested'} type - The field type
 * @property {string | number} [value] - The default value for String/Number types
 * @property {SchemaField[]} [children] - Child fields for Nested type
 */

/**
 * @typedef {Object} SchemaFormData
 * @property {SchemaField[]} fields - Array of schema fields
 */

export {};