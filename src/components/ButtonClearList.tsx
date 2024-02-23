type Props = {
    onCLick: () => void
}
export const ButtonClearList = ({ onCLick }: Props) => {
    return(
    <button
        onClick={onCLick}
        className="bg-red-600 rounded-md p-1 ml-36 hover:opacity-90"
      >
        Clear All
    </button>
    );
}