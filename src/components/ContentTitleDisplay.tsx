import { JSX } from "react/jsx-runtime";

interface KbdDisplayProps {
  text: string;
}

const ContentTitleDisplay = ({ text }: KbdDisplayProps): JSX.Element => (
  <div className="flex items-center space-x-2 mb-8">
    <kbd className="kbd kbd-lg">{text}</kbd>
  </div>
);

export default ContentTitleDisplay;
