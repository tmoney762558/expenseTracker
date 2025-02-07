import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { AddAccount } from "./";
import { DropdownMenu, SideNav } from "./";
import { removeAccount } from "../store/slices/accountsSlice";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  accountType: string;
  transactionType: string;
  transactionDate: string;
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
    <div className="flex h-fit min-h-screen bg-neutral-100">
      <SideNav></SideNav>
      <div className="flex flex-col items-center w-full mt-10 lg:px-5 px-3 pb-10">
        <h2 className="text-2xl font-bold">Accounts</h2>
        <AddAccount></AddAccount>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 cols-1 gap-5 w-full mt-10">
          {accounts.map((account, index1) => (
            <div
              key={index1}
              className="flex flex-col w-full max-w-[20rem] aspect-[2/1] p-3 rounded-lg bg-white border-neutral-300 border-2 shadow-lg"
            >
              <div className="flex justify-between">
                <h3>{account.accountType.toUpperCase()}</h3>{" "}
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
              <h3 className="text-elipse">Name: {account.name}</h3>
              <h3 className="text-elipse">Balance: ${account.balance}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
