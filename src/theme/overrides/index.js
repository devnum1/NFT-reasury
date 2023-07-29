//
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import CssBaseline from './CssBaseline';
import IconButton from './IconButton';
import Input from './Input';
import Link from './Link';
import Paper from './Paper';
import Switch from './Switch';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Backdrop(theme),
    Button(theme),
    Card(theme),
    CssBaseline(theme),
    IconButton(theme),
    Input(theme),
    Link(theme),
    Paper(theme),
    Switch(theme),
    Tooltip(theme),
    Typography(theme)
  );
}
