type Props = {
    onClick: () => void;
}
export const ButtonPending = ({ onClick }: Props) => {
    return(
      <button
        onClick={onClick}
        className="underline-hidden hover:text-blue-500 hover:underline-offset-4 hover:underline"
      >
        Pending
      </button>
    );
}