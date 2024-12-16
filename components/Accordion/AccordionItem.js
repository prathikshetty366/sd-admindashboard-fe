// components/Accordion/AccordionItem.js
const AccordionItem = ({ title, content, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 py-4">
    <div
      className="flex cursor-pointer items-center justify-between"
      onClick={onToggle}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <button className="text-indigo-600">{isOpen ? "Hide" : "Show"}</button>
    </div>
    {isOpen && (
      <div className="mt-4">
        <hr className="mb-4" />
        <p>{content}</p>
      </div>
    )}
  </div>
);

export default AccordionItem;
