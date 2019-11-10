# Shared Git Hooks

Copy the files in this directory to this project's `.git/hooks` directory.

## Included Hooks

### prepare-commit-msg
Add Branch Type and Issue Number to Commit Message
Including the issue number in the commit message will automatically associate
this commit with the corresponding issue in issue trackers.

If your branch naming style matches:

```
<type>-#<issue>-rest-of-branch-name
```

Then this hook will put the following at the top of your commit message

```
<type>:


refs #<issue>
```

**Example**
Every commit on a branch named

`feature-#117-refactor-messy-error-catching`

will have the following commit message generated

```
feature:


refs #117
```
