import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    options,
    label: 'Choose an option',
  },
};

export const WithError: Story = {
  args: {
    options,
    label: 'Choose an option',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    options,
    label: 'Disabled select',
    disabled: true,
  },
};

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

export const Countries: Story = {
  args: {
    options: countryOptions,
    label: 'Select your country',
  },
};
