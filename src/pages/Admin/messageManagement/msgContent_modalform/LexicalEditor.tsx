// components/LexicalEditor.tsx
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const LexicalEditor: React.FC<LexicalEditorProps> = ({ value, onChange }) => {
  const initialConfig = {
    namespace: "EmailContentEditor",
    theme: {
      // Optional: your theme or styling
    },
    onError: (error: Error) => {
      console.error(error);
    },
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const plainText = editorState.toJSON();
      onChange(JSON.stringify(plainText));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={
          <div className="editor-placeholder">Enter Email Content...</div>
        }
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
};

export default LexicalEditor;
