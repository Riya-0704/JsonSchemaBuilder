# JSON Schema Builder

A modern, interactive JSON schema builder built with React and ShadCN UI. Create dynamic JSON schemas with nested field support and real-time preview.

![JSON Schema Builder](https://img.shields.io/badge/React-18.3.1-blue)
![ShadCN UI](https://img.shields.io/badge/ShadCN-UI-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)

## 🚀 Live Demo
https://jsonschema-build.netlify.app/


## ✨ Features

- **Dynamic Field Creation**: Add String, Number, and Nested object fields
- **Unlimited Nesting**: Create complex nested structures with unlimited depth
- **Real-time Preview**: Live JSON preview that updates as you build
- **Intuitive Interface**: Clean, modern UI with ShadCN components
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Form Validation**: Built-in validation with React Hook Form
- **Collapsible Structures**: Organize complex schemas with collapsible nested fields
- **Type Safety**: JSDoc annotations for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1
- **UI Components**: ShadCN UI with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables
- **Form Management**: React Hook Form
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Language**: JavaScript with JSDoc

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd json-schema-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 Usage

### Building a Schema

1. **Add Fields**: Click "Add Field" to create new schema fields
2. **Configure Types**: Choose from String, Number, or Nested object types
3. **Set Values**: Define default values for String and Number fields
4. **Create Nesting**: Use Nested type to create complex object structures
5. **Preview JSON**: Switch to the "JSON Preview" tab to see your schema in real-time

### Field Types

- **String**: Text fields with customizable default values
- **Number**: Numeric fields with default value support
- **Nested**: Object fields that can contain other fields (unlimited depth)

### Interface Features

- **Collapsible Nesting**: Click the chevron icon to collapse/expand nested structures
- **Field Management**: Use the + button to add nested fields, trash icon to delete
- **Live Updates**: JSON preview updates automatically as you make changes
- **Responsive Tabs**: Switch between builder and preview modes

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # ShadCN UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── select.jsx
│   │   ├── tabs.jsx
│   │   └── badge.jsx
│   ├── SchemaBuilder.jsx   # Main application component
│   ├── SchemaField.jsx     # Individual field component
│   └── JSONPreview.jsx     # JSON preview component
├── utils/
│   └── schemaUtils.js      # Utility functions for schema operations
├── types/
│   └── schema.js           # Type definitions (JSDoc)
├── lib/
│   └── utils.js            # Utility functions
├── App.jsx                 # Root component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS with CSS variables for theming. You can customize the design by modifying:

- `src/index.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration
- Individual component styles in the `src/components/` directory

### Adding New Field Types

To add new field types:

1. Update the `createDefaultField` function in `src/utils/schemaUtils.js`
2. Add the new type to the Select component in `src/components/SchemaField.jsx`
3. Handle the new type in the `convertToJSON` function

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

The application is configured for easy Netlify deployment:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Or connect your GitHub repository to Netlify for automatic deployments


## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for the icon set
- [React Hook Form](https://react-hook-form.com/) for form management

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using React and ShadCN UI
