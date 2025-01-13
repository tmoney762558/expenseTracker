import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { AddAccount } from "./";
import { DropdownMenu, SideNav } from "./";
import { removeAccount } from "../store/slices/accountsSlice";

interface Transaction {
  id: number;
  name: string;
  amount: number;
}

interface Account {
  accountType: string;
  name: string;
  initialBalance: number;
  balance: number;
  transactions: Transaction[];
}

const AccountPage = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  const dispatch = useDispatch();

  function handleRemoveAccount(account: Account) {
    dispatch(removeAccount(account));
  }

  return (
    <div className="flex bg-neutral-100">
      <SideNav></SideNav>
      <div className="flex flex-col items-center w-full px-10">
        <AddAccount></AddAccount>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 cols-1 gap-5">
          {accounts.map((account, index1) => (
            <div
              key={index1}
              className="flex flex-col w-[20rem] aspect-[2/1] p-3 rounded-lg bg-white border-neutral-300 border-2"
            >
              <div className="flex justify-between">
                <h3>Type: {account.accountType.toUpperCase()}</h3>{" "}
                <DropdownMenu
                  dropdownItems={[
                    {
                      title: "View Transactions",
                      onClick: () => {},
                      link: `/transactions/${account.name}`,
                    },
                    {
                      title: "Delete",
                      onClick: () => {
                        handleRemoveAccount(account);
                      },
                    },
                  ]}
                ></DropdownMenu>
              </div>
              <h3>Name: {account.name}</h3>
              <h3>Balance: ${account.balance}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
