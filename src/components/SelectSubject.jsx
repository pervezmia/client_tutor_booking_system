import { Label, ListBox, Select } from "@heroui/react";

const subjects = [
  { id: "mathematics", subject: "Mathematics" },
  { id: "physics", subject: "Physics" },
  { id: "chemistry", subject: "Chemistry" },
  { id: "biology", subject: "Biology" },
  { id: "english", subject: "English" },
  { id: "programming", subject: "Programming" },
  { id: "economics", subject: "Economics" },
  { id: "accounting", subject: "Accounting" },
  { id: "bangla", subject: "Bangla" },
  { id: "ict", subject: "ICT" },
];

const SelectSubject = ({ INPUT_STYLES, defaultValue }) => {
  return (
    <>
      <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
        Subject
      </Label>
      <div>
        <Select name="subjectName" placeholder="Select one" defaultValue={defaultValue}>
          <Select.Trigger className={INPUT_STYLES}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {subjects.map((item) => (
                <ListBox.Item key={item.id} id={item.subject} textValue={item.subject}>
                  {item.subject}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </>
  );
};

export default SelectSubject;