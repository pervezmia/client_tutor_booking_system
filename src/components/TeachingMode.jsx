import { Label, ListBox, Select } from "@heroui/react";

const modes = [
  { id: "online", mode: "Online" },
  { id: "offline", mode: "Offline" },
  { id: "both", mode: "Both" },
];

const TeachingMode = ({ INPUT_STYLES }) => {
  return (
    <>
      <Label className="text-sm font-bold text-slate-700 ml-1">Teaching Mode</Label>
      <div>
        <Select name="teachingMode" placeholder="Select one">
          <Select.Trigger className={INPUT_STYLES}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {modes.map((mode, index) => (
                <ListBox.Item key={index} id={mode.id} textValue={mode.mode}>
                  {mode.mode}
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

export default TeachingMode;