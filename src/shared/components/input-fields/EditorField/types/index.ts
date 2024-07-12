export interface AutocompleterItemSpec {
    type?: 'autocompleteitem' | 'separator';
    value?: string;
    text?: string;
    icon?: string;
    action?: () => void;
}