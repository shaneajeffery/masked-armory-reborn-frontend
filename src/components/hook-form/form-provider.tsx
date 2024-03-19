import { ReactNode } from 'react';
import { FormProvider as Form } from 'react-hook-form';

interface Props {
  children: ReactNode;
  onSubmit: () => void;
  methods: Record<string, any>;
}

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    // @ts-ignore
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
