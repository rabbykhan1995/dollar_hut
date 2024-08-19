const Loading = () => {
  return (
    <div className="w-full h-2 bg-gray-300 relative overflow-hidden">
      <div className="absolute h-full w-full bg-orange-500 animate-progress"></div>
    </div>
  );
};
export default Loading;
