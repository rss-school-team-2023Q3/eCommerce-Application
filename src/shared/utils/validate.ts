export default function validate(regexp: RegExp, value: string) {
  return regexp.test(value);
}
