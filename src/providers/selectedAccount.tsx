import React from 'react';

export const SelectedAccount = React.createContext({
    selectedAccount: '',
    selectAccount: (account: string) => {}
});

export const useSelectedAccount = () => {
    const context = React.useContext(SelectedAccount);
    if (context === undefined) {
        throw new Error('useSelectedAccount must be used within a SelectedAccountProvider');
    }
    return context;
};
