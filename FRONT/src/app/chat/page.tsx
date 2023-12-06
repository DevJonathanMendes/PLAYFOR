import Button from "./components/Button";
import Input from "./components/Input";

const Message = (props: { init: "start" | "end" }) => {
  return (
    <li className={`chat chat-${props.init}`}>
      <div className="chat-bubble">
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
    <main className="flex w-full h-full">
      <div>
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          <li className="pb-3 sm:pb-4 hover:bg-sky-700">
            <div className="flex p-4 ">
              <div className="avatar online">
                <div className="w-12 mask mask-squircle">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="ml-4 flex-auto">
                <div className="font-medium">user1</div>
                <div className="mt-1 text-slate-700">user1@email.com</div>
              </div>
            </div>
          </li>
          <li className="pb-3 sm:pb-4">
            <div className="flex p-4 ">
              <div className="avatar online">
                <div className="w-12 mask mask-squircle">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="ml-4 flex-auto">
                <div className="font-medium">user2</div>
                <div className="mt-1 text-slate-700">user2@email.com</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="h-full overflow-auto scroll-smooth">
          <ul className="flex-1 p-4">
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

        <div className="flex p-2">
          <Input />
          <Button />
        </div>
      </div>
    </main>
  );
}
