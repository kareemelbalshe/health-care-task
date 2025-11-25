
export default function Footer() {

  return (
    <footer
      className={`w-full fixed bottom-0 left-0 bg-blue-500 border-t-4 border-t-blue-800 text-white p-3`}
    >
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center justify-center flex-col gap-2 text-lg md:text-2xl">
          <div className="flex items-center justify-center">
            © 2025 Copy Right{" "}
            <a
            rel='noopener'
              href="https://www.linkedin.com/in/kareemelbalshy/"
              target="_blank"
              className="ml-2 font-bold underline"
            >
              Kareem Elbalshy
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
