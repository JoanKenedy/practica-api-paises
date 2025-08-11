import { CheckIcon } from "@heroicons/react/24/solid";
interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function RadioButton({ label, value, checked, onChange }: RadioButtonProps) {
  return (
    <label className="flex items-center text-white cursor-pointer text-sm">
      <input
        type="radio"
        name="status"
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-input-hidden text-sm"
      />
      <div className="mr-2 custom-radio-square">
        <CheckIcon className="checkmark-icon" />
      </div>
      {label}
    </label>
  );
}
