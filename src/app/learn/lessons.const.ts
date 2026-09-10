export interface LessonMeta {
  readonly id: number;
  readonly path: string;
  readonly title: string;
  readonly subtitle: string;
}

export const LESSONS: readonly LessonMeta[] = [
  {
    id: 1,
    path: '1',
    title: 'Template syntax',
    subtitle: '@if, @for, @switch, @defer',
  },
  {
    id: 2,
    path: '2',
    title: 'Signals',
    subtitle: 'signal, computed, effect, linkedSignal',
  },
  {
    id: 3,
    path: '3',
    title: 'Component I/O',
    subtitle: 'input(), output(), model()',
  },
  {
    id: 4,
    path: '4',
    title: 'RxJS interop',
    subtitle: 'toSignal(), toObservable()',
  },
  {
    id: 5,
    path: '5',
    title: 'Zoneless CD',
    subtitle: 'What still updates the UI',
  },
];
