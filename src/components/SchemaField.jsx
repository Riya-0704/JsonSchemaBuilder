import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

export const SchemaField = ({
  field,
  index,
  control,
  onAddField,
  onDeleteField,
  onUpdateField,
  level = 0,
  parentPath = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fieldPath = parentPath ? `${parentPath}.children.${index}` : `fields.${index}`;
  
  const watchedField = useWatch({
    control,
    name: fieldPath,
  });

  const handleKeyChange = (newKey) => {
    onUpdateField(field.id, { key: newKey });
  };

  const handleTypeChange = (newType) => {
    const updates = { type: newType };
    
    if (newType === 'String') {
      updates.value = '';
      updates.children = undefined;
    } else if (newType === 'Number') {
      updates.value = 0;
      updates.children = undefined;
    } else if (newType === 'Nested') {
      updates.value = undefined;
      updates.children = [];
    }
    
    onUpdateField(field.id, updates);
  };

  const handleValueChange = (newValue) => {
    onUpdateField(field.id, { value: newValue });
  };

  const marginLeft = level * 24;

  return (
    <div className="space-y-3">
      <Card 
        className="transition-all duration-200 hover:shadow-md border-l-4 border-l-primary/20"
        style={{ marginLeft: `${marginLeft}px` }}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {field.type === 'Nested' && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 mt-6 flex-shrink-0"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            )}
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`key-${field.id}`} className="text-sm font-medium">
                  Field Name
                </Label>
                <Input
                  id={`key-${field.id}`}
                  type="text"
                  value={watchedField?.key || field.key}
                  onChange={(e) => handleKeyChange(e.target.value)}
                  placeholder="Enter field name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Type</Label>
                <Select
                  value={watchedField?.type || field.type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="String">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Str</Badge>
                        String
                      </div>
                    </SelectItem>
                    <SelectItem value="Number">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Num</Badge>
                        Number
                      </div>
                    </SelectItem>
                    <SelectItem value="Nested">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Obj</Badge>
                        Nested
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {field.type !== 'Nested' && (
                <div className="space-y-2">
                  <Label htmlFor={`value-${field.id}`} className="text-sm font-medium">
                    Default Value
                  </Label>
                  {field.type === 'String' ? (
                    <Input
                      id={`value-${field.id}`}
                      type="text"
                      value={watchedField?.value || field.value || ''}
                      onChange={(e) => handleValueChange(e.target.value)}
                      placeholder="Enter default value"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <Input
                      id={`value-${field.id}`}
                      type="number"
                      value={watchedField?.value || field.value || 0}
                      onChange={(e) => handleValueChange(parseFloat(e.target.value) || 0)}
                      placeholder="Enter default value"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-6 flex-shrink-0">
              {field.type === 'Nested' && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onAddField(field.id)}
                  className="h-8 w-8 bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300"
                  title="Add nested field"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onDeleteField(field.id)}
                className="h-8 w-8 bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
                title="Delete field"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {field.type === 'Nested' && field.children && !isCollapsed && (
        <div className="space-y-3 border-l-2 border-dashed border-gray-200 pl-4 ml-4">
          {field.children.map((child, childIndex) => (
            <SchemaField
              key={child.id}
              field={child}
              index={childIndex}
              control={control}
              onAddField={onAddField}
              onDeleteField={onDeleteField}
              onUpdateField={onUpdateField}
              level={level + 1}
              parentPath={`${fieldPath}.children`}
            />
          ))}
        </div>
      )}
    </div>
  );
};