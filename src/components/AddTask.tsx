type Props = {
    onClick: () => void;
    inputItem: string
    onChange: (e: HTMLElement) => void;
}

export const AddTask = ({ onClick, inputItem, onChange }: Props) => {
    <div className="flex gap-3 justify-center">
    <input
      type="text"
      placeholder="Add a new task"
      className="h-11 text-black border border-black rounded outline-none w-96 p-3"
      value={inputItem}
      onChange={onChange}
      autoFocus
    />
    <button
      className="bg-blue-600 rounded-md w-40 hover:opacity-90"
      onClick={onClick}
    >
      Add task
    </button>
  </div>
}