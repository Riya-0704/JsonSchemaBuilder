import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, FileCode, Settings, Eye } from 'lucide-react';
import { SchemaField } from './SchemaField';
import { JSONPreview } from './JSONPreview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { createDefaultField, removeFieldById } from '../utils/schemaUtils';


export const SchemaBuilder = () => {
  const [fields, setFields] = useState([createDefaultField()]);
  
  const { control } = useForm({
    defaultValues: {
      fields: fields
    }
  });

  const addField = (parentId) => {
    const newField = createDefaultField();
    
    if (parentId) {
      setFields(prevFields => {
        return prevFields.map(field => {
          if (field.id === parentId && field.type === 'Nested') {
            return {
              ...field,
              children: [...(field.children || []), newField]
            };
          }
          
          const updateNestedField = (f) => {
            if (f.id === parentId && f.type === 'Nested') {
              return {
                ...f,
                children: [...(f.children || []), newField]
              };
            }
            if (f.children) {
              return {
                ...f,
                children: f.children.map(updateNestedField)
              };
            }
            return f;
          };
          
          return updateNestedField(field);
        });
      });
    } else {
      setFields(prevFields => [...prevFields, newField]);
    }
  };

  const deleteField = (id) => {
    setFields(prevFields => removeFieldById(prevFields, id));
  };

  const updateField = (id, updates) => {
    setFields(prevFields => {
      const updateFieldRecursive = (field) => {
        if (field.id === id) {
          return { ...field, ...updates };
        }
        if (field.children) {
          return {
            ...field,
            children: field.children.map(updateFieldRecursive)
          };
        }
        return field;
      };
      
      return prevFields.map(updateFieldRecursive);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Settings className="w-8 h-8" />
                  JSON Schema Builder
                </CardTitle>
                <CardDescription className="text-blue-100 mt-2">
                  Create dynamic JSON schemas with nested field support and real-time preview
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                v2.0
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="builder" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none bg-gray-100 h-12">
                <TabsTrigger 
                  value="builder" 
                  className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Settings className="w-4 h-4" />
                  Schema Builder
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  JSON Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Build Your Schema</h2>
                    <p className="text-gray-600 mt-1">
                      Add fields, configure types, and create nested structures
                    </p>
                  </div>
                  <Button
                    onClick={() => addField()}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Add Field
                  </Button>
                </div>

                <div className="space-y-4">
                  {fields.length === 0 ? (
                    <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileCode className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No fields yet
                        </h3>
                        <p className="text-gray-600 mb-6 text-center max-w-md">
                          Get started by adding your first field to the schema. You can create strings, numbers, and nested objects.
                        </p>
                        <Button
                          onClick={() => addField()}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Plus className="w-4 h-4" />
                          Add First Field
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    fields.map((field, index) => (
                      <SchemaField
                        key={field.id}
                        field={field}
                        index={index}
                        control={control}
                        onAddField={addField}
                        onDeleteField={deleteField}
                        onUpdateField={updateField}
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="preview" className="p-6">
                <JSONPreview fields={fields} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};