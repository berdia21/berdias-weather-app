interface Props {
  isLoading: boolean;
  isError: boolean;
}

export function Status({ isLoading, isError }: Props) {
  return (
    <>
      {isLoading && <div className="loading"></div>}
      {isError && !isLoading && (
        <p className="text-center error">Location was not found 😕</p>
      )}
    </>
  );
}
