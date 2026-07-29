import AutoCompleteSearch from "../../../components/ui/AutoCompleteSearch";

const COMMON_TASKS = [
  { id: "t1", label: "Autonomous Drone Firmware V2.4", category: "Robotics Core Tech" },
  { id: "t2", label: "Sponsor Pitch Deck for HackPlanet", category: "Corporate Relations" },
  { id: "t3", label: "Order 20 LiPo Batteries & ESCs", category: "Hardware Procurement" },
  { id: "t4", label: "Symphony Night Sound System Setup", category: "Stage & Acoustics" },
  { id: "t5", label: "Publish NAAC Student Activity Report", category: "Faculty Governance" },
  { id: "t6", label: "ABACUS Society Quantitative Model Review", category: "Technical" },
];

export default function TaskSearch({ value, onChange }) {
  return (
    <div className="w-80">
      <AutoCompleteSearch
        items={COMMON_TASKS}
        value={value}
        onChange={onChange}
        onSelect={(item) => {
          if (item?.label) onChange(item.label);
        }}
        placeholder="Search tasks (e.g. ABACUS...)"
      />
    </div>
  );
}