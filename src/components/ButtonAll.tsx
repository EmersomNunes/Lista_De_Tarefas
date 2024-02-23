type Props = {
    onClick: () => void;
}
export const ButtonAll = ({ onClick }: Props) => {
    return(
    <button
        onClick={onClick}
        className="underline-hidden hover:text-blue-500 hover:underline-offset-4 hover:underline"
      >
        All
    </button>
    );
}