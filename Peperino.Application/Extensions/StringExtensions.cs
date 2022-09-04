using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Peperino
{
    /// <summary>  
    /// Contains all custom written string related Extension Methods.  
    /// </summary>  
    public static class StringExtensions
    {
        private static string RemoveDiacritics(this string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder(capacity: normalizedString.Length);

            for (int i = 0; i < normalizedString.Length; i++)
            {
                char c = normalizedString[i];
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder
                .ToString()
                .Normalize(NormalizationForm.FormC);
        }

        /// <summary>  
        /// Removes all accents from the input string.  
        /// </summary>  
        /// <param name="text">The input string.</param>  
        /// <returns></returns>  
        private static string RemoveAccents(this string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return text;
            }

            text = text.Normalize(NormalizationForm.FormD);
            char[] chars = text
                .Where(c => CharUnicodeInfo.GetUnicodeCategory(c)
                != UnicodeCategory.NonSpacingMark).ToArray();

            return new string(chars).Normalize(NormalizationForm.FormC);
        }

        /// <summary>  
        /// Turn a string into a slug by removing all accents,   
        /// special characters, additional spaces, substituting   
        /// spaces with hyphens & making it lower-case.  
        /// </summary>  
        /// <param name="phrase">The string to turn into a slug.</param>  
        /// <returns></returns>  
        public static string Slugify(this string phrase)
        {
            // Remove all accents and make the string lower case.  
            string output = phrase.RemoveDiacritics().ToLower();

            // Remove all special characters from the string.  
            output = Regex.Replace(output, @"[^A-Za-z0-9ЁёА-я\s-]", "");

            // Remove all additional spaces in favour of just one.
            output = Regex.Replace(output, @"\s+", " ").Trim();

            // Replace all spaces with the hyphen.  
            output = Regex.Replace(output, @"\s", "-");

            // Return the slug.  
            return output;
        }
    }
}
