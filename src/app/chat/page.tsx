const Message = (props: { init: "start" | "end" }) => {
  return (
    <li className={`chat chat-${props.init}`}>
      <div className="chat-bubble chat-bubble-accent">
        <p className="text-justify">
          You underestimate my power! You underestimate my power! You
          underestimate my power! You underestimate my power! You underestimate
          my power! You underestimate my power! You underestimate my power!
        </p>
        <div className="chat-footer chat-end">
          <time className="flex justify-end text-xs opacity-50">16:32</time>
        </div>
      </div>
    </li>
  );
};

export default function Chat() {
  return (
    <main className="h-full shadow">
      <div className="p-2 flex justify-between items-center border-b-2">
        <div className="font-semibold text-2xl">Chat</div>
        <div className="h-10 w-10 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          JM
        </div>
      </div>

      <div className="h-5/6 flex flex-row justify-between">
        <div className="flex flex-col w-2/5 border-r-2">
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>
          <ul className="overflow-y-auto">
            {(() => {
              const contacts = [];

              for (let i = 0; i < 15; i++) {
                contacts.push(
                  <li
                    key={i}
                    className="flex flex-row py-4 px-2 items-center border-b-2"
                  >
                    <div className="w-full">
                      <div className="text-lg font-semibold">Luis1994</div>
                      <span className="text-gray-500">Pick me at 9:00 Am</span>
                    </div>
                  </li>
                );
              }

              return contacts;
            })()}
          </ul>
        </div>

        <div className="size-full px-2 flex flex-col justify-between">
          <div className="overflow-y-auto">
            <ul>
              {(() => {
                const messages = [];
                for (let i = 0; i < 15; i++) {
                  messages.push(
                    <Message key={i} init={i % 2 == 1 ? "start" : "end"} />
                  );
                }
                return messages;
              })()}
            </ul>
          </div>

          <div className="p-2">
            <input className="FormInput" type="text" placeholder="Message" />
          </div>
        </div>
      </div>
    </main>
  );
}
