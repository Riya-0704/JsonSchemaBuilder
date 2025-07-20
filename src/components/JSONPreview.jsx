import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { convertToJSON } from '../utils/schemaUtils';

export const JSONPreview = ({ fields }) => {
  const jsonData = convertToJSON(fields);
  
  return (
    <Card className="h-full min-h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            JSON Preview
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              Live
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Auto-updating</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-gray-950 rounded-lg p-4 border border-gray-700 overflow-auto max-h-[400px]">
          <pre className="text-sm font-mono leading-relaxed text-gray-100 whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-xs text-gray-400 flex items-center justify-between">
          <span>Fields: {fields.length}</span>
          <span>Size: {JSON.stringify(jsonData).length} chars</span>
        </div>
      </CardContent>
    </Card>
  );
};